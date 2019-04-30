export default class Ninja {
  constructor(id: string, name: string, avatarUrl: string, job: string, outsorcing?: boolean = false) {
    this.id = id;
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.job = job;
    this.outsorcing = outsorcing;
  }

  id: string;
  name: string;
  avatarUrl: string;
  job: string;
  outsorcing: boolean;
}
