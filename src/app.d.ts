// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare namespace App {
  interface Locals {
    userid: string;
  }

  interface PageData {
    animal: import('$lib/utils/types').Animal;
    day: import('$lib/utils/types').Day;
  }

  // interface Platform {}
}
