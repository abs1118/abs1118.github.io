/**
 * Created by sunxianxiong on 17/1/24.
 */
import UIStore from './uiStore';
import BlogListStore from './BlogListStore';

export default class AppStore {

    uiStore;
    blogListStore;

    constructor() {
        this.uiStore = new UIStore(this);
        this.blogListStore = new BlogListStore(this);
    }
}