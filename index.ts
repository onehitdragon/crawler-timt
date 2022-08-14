import fetch from "node-fetch";
import { load,  } from "cheerio";
import Post from "./Post";

const url = "https://www.tienichmaytinh.net/ghost-windows-10-x64-x86-21h1-no-full-soft-bamboo-aug-2021";

fetch(url, {
    method: "GET"
})
.then((res) => {
    res.text().then((html) => {
        const $ = load(html);
        const title = $('.entry-content .post-tile').text();
        $('.entry-content p > img').toArray().forEach((e) => {
            console.log(e.attribs.src);
        });
        $('.entry-content p, h3 span').toArray().forEach((e) => {
            e.children.forEach((e) => {
                if(e.type === "text"){
                    console.log(e.data);
                }
            })
        });
    });
});