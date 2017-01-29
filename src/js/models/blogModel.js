/**
 * Created by sunxianxiong on 17/1/27.
 */
export default  class BlogModel{
    create_time;
    number;
    content;
    labels;
    title;
    time;
    constructor(blogModel){
        this.content = blogModel.body;
        this.title  = blogModel.title;
        this.create_time = blogModel.created_at.substr(0, 10);
        this.number = blogModel.number;
        this.labels = blogModel.labels;
        this.time = parseInt(blogModel.created_at.substring(0, 4))
    }
}