import { PostLocation } from "./PostLocation";

export interface Post
{
    $key:string;
     post_title:string;
     post_content:string;
     post_l:PostLocation;
     post_imge:string;
}