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
    constructor(appStore){
        this.blogListStore =appStore.blogListStore;
    }
    @action getBlog(number) {

        if(this.blogListStore.blogList.length>0){
            for(let obj of this.blogListStore.blogList){
                if(obj.number==number){
                    this.blog = obj;
                    this.loading = false;
                    break;
                }
            }
        }else{
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
}