/**
 * Created by sunxianxiong on 17/1/24.
 */
import { observable, action } from 'mobx';
import { getBlogs } from '../fetchHandler';
import { message } from 'antd';
import BlogModel from '../models/blogModel'
export  default  class BlogListStore{
    @observable blogList = [];
    @observable loading = true;
    @action getBlogs(type) {

        getBlogs()
            .then(res => {
                    this.blogList = res.map(item=>new BlogModel(item));
                    this.loading = false;
            })
            .catch(e => {
                console.log(e);
                message.error('请求失败');
                this.loading = false;
            })
    }
}