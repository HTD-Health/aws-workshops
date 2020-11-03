import React from "react";
import { render, screen } from "@testing-library/react";
import { EntriesList } from "./EntriesList";

describe("Entries list component tests", () => {
  const onChange = jest.fn();
  const onRemove = jest.fn();
  const createEntry = (id = 0) => ({
    id: id.toString(10),
    completed: true,
    body: `test-body=${id}`,
  });

  it("renders entry", () => {
    const entry = createEntry();
    const { getByTestId } = render(
      <EntriesList onChange={onChange} onRemove={onRemove} entries={[entry]} />
    );
    expect(getByTestId(entry.id).textContent).toBe(entry.body);
  });
});
