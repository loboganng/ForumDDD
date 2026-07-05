// Criamos Slug como uma classe pq essa classe têm seus atributos e restrições próprios
// Nela adicionamos REGEX, pra evitar de poluir o código principal
export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and normalizes it as a slug
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // espaços viram hífen
      .replace(/[^\w-]+/g, '') // remove símbolos, mas mantém hífen
      .replace(/_+/g, '-') // underline vira hífen
      .replace(/-+/g, '-') // vários hífens viram 1
      .replace(/^-+|-+$/g, '') // remove hífens das pontas

    return new Slug(slugText)
  }
}
