export default interface Post{
    id: string,
    title: string,
    createAt: Date,
    contents: Content[],
}

export enum ContentType{
    Title,
    Text,
    Link,
    Image
}

abstract class Content{
    type: ContentType
    constructor(type: ContentType){
        this.type = type;
    }
}

export class TitleContent extends Content{
    value: string;
    constructor(value: string){
        super(ContentType.Title);
        this.value = value;
    }
}

export class TextContent extends Content{
    value: string;
    constructor(value: string){
        super(ContentType.Text);
        this.value = value;
    }
}

export class LinkContent extends Content{
    value: string;
    src: string;
    constructor(value: string, src: string){
        super(ContentType.Text);
        this.value = value;
        this.src = src;
    }
}

export class ImageContent extends Content{
    src: string;
    constructor(src: string){
        super(ContentType.Text);
        this.src = src;
    }
}