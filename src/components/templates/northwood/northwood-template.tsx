"use client";
import {useEffect,useState} from "react";
import {NorthwoodWebsite} from "./northwood-website";
import type {NorthwoodPageData} from "./types";
export function NorthwoodTemplate({basePath="/northwood"}:{basePath?:string}){
 const [page,setPage]=useState<NorthwoodPageData|null>(null),[stylesheet,setStylesheet]=useState(""),[failed,setFailed]=useState(false);
 useEffect(()=>{const controller=new AbortController();async function load(){const pathname=window.location.pathname;const relative=(basePath&&pathname.startsWith(basePath)?pathname.slice(basePath.length):pathname).replace(/\/$/,"")||"/";const index=await fetch("/templates/northwood/data/pages.json",{signal:controller.signal});if(!index.ok)throw Error("Page index unavailable");const pages:{path:string;file:string}[]=await index.json();const entry=pages.find(item=>item.path===relative);if(!entry)throw Error("Page not found");const response=await fetch(`/templates/northwood/data/${entry.file}.json`,{signal:controller.signal});if(!response.ok)throw Error("Page unavailable");const data:NorthwoodPageData=await response.json();if(!controller.signal.aborted){document.title=data.title;setStylesheet(`/templates/northwood/styles/${entry.file}.css`);setPage(data)}}load().catch(()=>{if(!controller.signal.aborted)setFailed(true)});return()=>controller.abort()},[basePath]);
 if(failed)return <main style={{padding:40}}>Page not found. <a href={basePath+"/"}>Return home</a></main>;
 return page?<><link rel="stylesheet" href={stylesheet}/><NorthwoodWebsite page={page} basePath={basePath}/></>:<p role="status">Loading Northwood…</p>;
}
