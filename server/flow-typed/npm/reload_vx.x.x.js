declare module 'reload' {
  declare module.exports: {
    (
      app: express$Application
    ): {
      reload(): void
    }
  };
}
