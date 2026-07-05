import { randomUUID } from 'node:crypto'

// Super classe que usaremos para gerenciar o ID das entidades
export class UniqueEntityId {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }
}
