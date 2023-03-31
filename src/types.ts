export type InputEffect<T> = {
  sendData?: () => Result<T>
}

export type Result<T> = { name: string; value: T }

export type Value = string | number | boolean | readonly string[]
