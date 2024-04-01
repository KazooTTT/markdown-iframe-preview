"use client";
import React from "react";
import "github-markdown-css/github-markdown.css"; // 引入 github-markdown-css

const DemoPage = () => {
  return (
    <div className="w-full h-full bg-orange-100">
      <h1>this is a special link</h1>
      <div>which should be render in a iframe</div>
    </div>
  );
};

export default DemoPage;
