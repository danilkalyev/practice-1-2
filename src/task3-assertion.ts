// Тип конфигурации приложения
export type AppConfig = {
  apiUrl: string;
  timeout: number;
};

// Напишите Assertion Function assertValidConfig
// Если данные не соответствуют AppConfig - бросить Error("Invalid config")
// Используйте синтаксис: asserts data is AppConfig
export function assertValidConfig(data: unknown): asserts data is AppConfig {
  // typeof null === "object", поэтому null проверяем отдельно
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid config");
  }

  const obj = data as Record<string, unknown>;

  if (typeof obj.apiUrl !== "string" || typeof obj.timeout !== "number") {
    throw new Error("Invalid config");
  }

  // Ничего не возвращаем: дошли сюда - значит данные валидны
}

// Функция инициализации.
// Сначала вызывает assertValidConfig(config).
// Если проверка прошла - вернуть "API: <apiUrl>, Timeout: <timeout>"
export function initApp(config: unknown): string {
  assertValidConfig(config);

  // После assertion-функции config сужен до AppConfig до конца функции
  return `API: ${config.apiUrl}, Timeout: ${config.timeout}`;
}
