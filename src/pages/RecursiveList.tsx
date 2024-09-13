import React, { useState } from "react";

type Topic = {
  title: string;
  enable: boolean;
  subTopics: Topic[]; // Recursive type for nested subTopics
};

const topics: Topic[] = [
  {
    title: "title1",
    enable: true,
    subTopics: [
      {
        title: "title1-1",
        enable: true,
        subTopics: [
          {
            title: "title1-1-1",
            enable: true,
            subTopics: [
              {
                title: "title1-1-1-1",
                enable: false,
                subTopics: [],
              },
              {
                title: "title1-1-1-2",
                enable: false,
                subTopics: [],
              },
            ],
          },
        ],
      },
      {
        title: "title1-2",
        enable: false,
        subTopics: [
          {
            title: "title1-2-1",
            enable: true,
            subTopics: [
              {
                title: "title1-2-1-1",
                enable: false,
                subTopics: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "title2",
    enable: false,
    subTopics: [
      {
        title: "title2-1",
        enable: true,
        subTopics: [
          {
            title: "title2-1-1",
            enable: false,
            subTopics: [],
          },
        ],
      },
    ],
  },
];

/**
 * 1. component structure
 * 2. html sematic
 * 3. recursive nested components
 */

type RenderTopic = {
  topic: Topic;
};

const RenderTopic: React.FC<RenderTopic> = ({ topic }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (enable: boolean) => () => {
    if (enable) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <li className="w-80" key={topic.title}>
      <div
        className={`my-4
        ${topic.enable ? "text-teal-500" : ""}
        ${topic.enable ? "hover:cursor-pointer" : ""}
        ${topic.enable ? "hover:text-teal-300" : ""}`}
        onClick={handleToggle(topic.enable)}
      >
        {topic.title}{" "}
        {topic.subTopics.length > 0 ? `(${topic.subTopics.length})` : ""}
      </div>
      {isExpanded && topic.subTopics && topic.subTopics.length > 0 && (
        <ul className="mx-8">
          {topic.subTopics.map((subTopic) => (
            <RenderTopic key={subTopic.title} topic={subTopic} />
          ))}
        </ul>
      )}
    </li>
  );
};

export const RecursiveList = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        RecursiveList (Recursive Component)
      </h1>
      <div className="flex flex-col items-center">
        <ul className="mx-8">
          {topics &&
            topics.map((topicItem) => (
              <RenderTopic key={topicItem.title} topic={topicItem} />
            ))}
        </ul>
      </div>
      <div>
        <p className="my-10 text-center text-base font-bold leading-9 tracking-tight text-gray-900">
          If you want to parse an HTML document, extract heading elements (H1 -
          H6), and organize them into a tree structure representing the
          hierarchy of the headings, you can refer to the
          <a
            className="pl-2 border-transparent text-teal-700
             hover:text-teal-500 underline hover:underline-offset-2 hover:cursor-pointer"
            href="https://github.com/DavisChang/js-utils/blob/master/headingsTreeview.js"
            aria-label="link to function headingsTreeview"
            target="_blank"
          >
            function headingsTreeview
          </a>
          .
        </p>
      </div>
    </div>
  );
};
