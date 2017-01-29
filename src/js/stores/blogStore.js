/**
 * Created by sunxianxiong on 17/1/24.
 */
import { observable, action } from 'mobx';
import { getBlog } from '../fetchHandler';
import { message } from 'antd';
import BlogModel from '../models/blogModel'
export  default  class BlogStore{
    @observable blog = {};
    @observable loading = true;
    @action getBlog(number) {

        getBlog(number)
            .then(res => {
                this.blog = new BlogModel(res);
                this.loading = false;
            })
            .catch(e => {
                console.log(e);
                message.error('请求失败');
                this.loading = false;
            })
    }
}