/**
 * Created by sunxianxiong on 17/1/24.
 */
import { observable, action } from 'mobx';
import { getBlogs } from '../fetchHandler';
import { message } from 'antd';
export  default  class BlogListStore{
    @observable blogList = [];
    @action getBlogs(type) {

        getBlogs()
            .then(res => {
                if (res.success) {
                    // this.collectionList = res.attr.collectionList.map(item => new CollectionModel(item));
                } else {
                    message.info('查询无结果');
                }
                this.appStore.collectionSearchForm = searchForm;
            })
            .catch(e => {
                console.log(e);
                message.error('请求失败');
            })
    }
}