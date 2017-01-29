/**
 * Created by sunxianxiong on 17/1/24.
 */
import UIStore from './uiStore';
import BlogListStore from './blogListStore';
import BlogStore from './blogStore';

export default class AppStore {

    uiStore;
    blogListStore;
    blogStore;

    constructor() {
        this.uiStore = new UIStore(this);
        this.blogListStore = new BlogListStore(this);
        this.blogStore = new BlogStore(this);
    }
}