export class Message {
  constructor(
    public _id: String,
    public text: String,
    public viewed: String,
    public created_at: String,
    public emiter: String,
    public receiver: String
  ) { }
}
