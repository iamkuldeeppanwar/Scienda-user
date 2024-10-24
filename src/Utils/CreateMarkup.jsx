import React from "react";

function CreateMarkup({ content }) {
  const createMarkupF = (htmlContent) => {
    return { __html: htmlContent };
  };

  return <div dangerouslySetInnerHTML={createMarkupF(content)} />;
}

export default CreateMarkup;
