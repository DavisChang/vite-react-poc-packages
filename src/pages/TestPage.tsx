import { useEffect, useState } from "react";
import { fetchQuestions, fetchSubmissions } from "../apis/algoexpert/questions";

type TQuestion = {
  id: string;
  name: string;
  category: string;
  status: string;
};

interface CategoriesStructure {
  [key: string]: TQuestion[];
}

type TSubmission = {
  questionId: string;
  status: string;
};
interface SubmissionsStructure {
  [key: string]: TSubmission;
}

const useFetchQuestionsAndSubmissions = (
  setQuestionsAndSubmissions: React.Dispatch<
    React.SetStateAction<CategoriesStructure>
  >
) => {
  useEffect(() => {
    const getData = async () => {
      const [questions, submissions] = await Promise.all([
        fetchQuestions(),
        fetchSubmissions(),
      ]);
      const submissionById: SubmissionsStructure = submissions.reduce(
        (acc, curr) => ({ ...acc, [curr.questionId]: curr }),
        {}
      );

      const questionsAndSubmissions: CategoriesStructure = {};

      questions.forEach((question) => {
        const questionWithStatus = {
          ...question,
          status: submissionById[question.id]
            ? submissionById[question.id].status
            : "",
        };

        if (questionsAndSubmissions[questionWithStatus.category]) {
          questionsAndSubmissions[questionWithStatus.category].push(
            questionWithStatus
          );
        } else {
          questionsAndSubmissions[questionWithStatus.category] = [
            questionWithStatus,
          ];
        }
      });

      console.log({ questions, submissionById, questionsAndSubmissions });
      setQuestionsAndSubmissions(questionsAndSubmissions);
    };
    getData();
  }, [setQuestionsAndSubmissions]);
};

const Status = ({ status }: { status: string }) => {
  switch (status) {
    case "CORRECT":
      return <span className="text-green-500">V</span>;
    case "INCORRECT":
      return <span className="text-red-500">X</span>;
    case "PARTIALLY_CORRECT":
      return <span className="text-yellow-500">??</span>;
    default:
      return <span>[]</span>;
  }
};

function TestPage() {
  const [questionsAndSubmissions, setQuestionsAndSubmissions] =
    useState<CategoriesStructure>({});
  useFetchQuestionsAndSubmissions(setQuestionsAndSubmissions);

  console.log("questionsAndSubmissions:", questionsAndSubmissions);
  return (
    <>
      <h1 className="text-3xl font-bold underline">TestPage</h1>
      <div className="flex flex-row justify-center my-6">
        {questionsAndSubmissions &&
          Object.keys(questionsAndSubmissions).map((category) => {
            const count = questionsAndSubmissions[category].reduce(
              (acc, curr) => {
                if (curr.status === "CORRECT") {
                  return (acc += 1);
                }
                return acc;
              },
              0
            );
            return (
              <div key={category} className="text-left">
                <h2 className="text-lg">{`${category} - ${count} / ${questionsAndSubmissions[category].length}`}</h2>
                {questionsAndSubmissions[category] &&
                  questionsAndSubmissions[category].map((q) => {
                    return (
                      <div key={q.id}>
                        <p className="mt-3 leading-6 text-gray-600">
                          <Status status={q.status} />{" "}
                          {`${q.name} (id: ${q.id})`}
                        </p>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default TestPage;
