"use client";

import { api } from "~/trpc/react";

export default function LessonTestPage() {
  // 1. Fetch data using the hook
  const { data: lessons, isLoading, error } = api.lesson.getAll.useQuery();

  // 2. Handle Loading State
  if (isLoading) {
    return (
      <div className="p-8">
        <p className="animate-pulse text-gray-500">Loading lessons...</p>
      </div>
    );
  }

  // 3. Handle Error State (Useful for debugging Context issues)
  if (error) {
    return (
      <div className="p-8 text-red-500">
        <h1 className="font-bold">tRPC Error:</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  // 4. Handle Empty State
  if (!lessons || lessons.length === 0) {
    return <div className="p-8">No lessons found in the database.</div>;
  }

  // 5. Success State
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Lesson List</h1>
      <hr />
      
      {lessons.map((lesson) => (
        <div key={lesson.id} className="border p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">{lesson.title}</h2>
          <p className="text-sm text-gray-500">ID: {lesson.id}</p>
          
          <div className="mt-4">
            <h3 className="font-medium underline">Blocks ({lesson.blocks.length})</h3>
            <ul className="list-disc ml-5">
              {lesson.blocks.map((block) => (
                <li key={block.id}>
                  {block.type} block - Order: {block.order}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-medium underline">Questions ({lesson.questions.length})</h3>
            <p className="text-sm">
              First Question: {lesson.questions[0]?.question ?? "None"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}