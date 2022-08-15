import fetch from "node-fetch";
import { load } from "cheerio";
import { v4 } from "uuid";
import Post, { TitleContent, TextContent, LinkContent, ImageContent } from "./Post.js";

const url = "https://www.tienichmaytinh.net/ghost-windows-10-x64-x86-21h1-no-full-soft-bamboo-aug-2021";

const post: Post = {
    id: v4(),
    title: "title",
    createAt: new Date(),
    contents: []
}

fetch(url, {
    method: "GET"
})
.then((res) => {
    res.text().then((html) => {
        const $ = load(html);
        const title = $('.post-tile').text();
        post.title = title;
        $('.entry-content > p, .entry-content > h3, .entry-content > ul').toArray().forEach((e) => {
            if(e.tagName === "h3"){
                e.children.forEach((e) => {
                    if(e.type === "text"){
                        console.log(`(title)${e.data}`);
                        post.contents.push(new TitleContent(e.data));
                    }
                    else if(e.type === "tag" && e.tagName === "span"){
                        console.log(`(title)${(e.children[0].type === "text" && e.children[0].data)}`);
                        post.contents.push(new TitleContent(e.children[0].type === "text" ? e.children[0].data : ""));
                    }
                    else if(e.type === "tag" && e.tagName === "img"){
                        console.log(`(image)${e.attribs["src"]}`);
                        post.contents.push(new ImageContent(e.attribs["src"]));
                    }
                });
            }
            if(e.tagName === "p"){
                e.children.forEach((e) => {
                    if(e.type === "text"){
                        console.log(e.data);
                        post.contents.push(new TextContent(e.data));
                    }
                    if(e.type === "tag" && e.tagName === "a"){
                        console.log(`(link)${e.attribs["href"]}(value)${(e.children[0].type === "text" && e.children[0].data)}`);
                        post.contents.push(new LinkContent(e.children[0].type === "text" ? e.children[0].data : "", e.attribs["href"]));
                    }
                    if(e.type === "tag" && e.tagName === "img"){
                        console.log(`(image)${e.attribs["src"]}`);
                        post.contents.push(new ImageContent(e.attribs["src"]));
                    }
                });
            }
            if(e.tagName === "ul"){
                e.children.forEach((e) => {
                    if(e.type === "tag" && e.tagName === "li"){
                        console.log("(item)");
                        e.children.forEach((e) => {
                            if(e.type === "text"){
                                console.log(e.data);
                            }
                            if(e.type === "tag" && e.tagName === "a"){
                                console.log(`(link)${e.attribs["href"]}(value)${(e.children[0].type === "text" && e.children[0].data)}`);
                            }
                        });
                    }
                });
            }
        });
        console.log(post);
    });
});