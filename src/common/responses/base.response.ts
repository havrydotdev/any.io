export default class IResponse<T> {
  constructor(data: T, ok?: boolean) {
    this.data = data;
    this.ok = ok ?? true;
  }

  ok: boolean;
  data: T;
}
