declare module "@storybook/react" {
  export type Meta<T = unknown> = {
    title?: string;
    component?: T;
    tags?: string[];
    argTypes?: Record<string, unknown>;
  };

  export type StoryObj<T = unknown> = {
    args?: Partial<T> | Record<string, unknown>;
    render?: (args: unknown) => unknown;
  };
}
