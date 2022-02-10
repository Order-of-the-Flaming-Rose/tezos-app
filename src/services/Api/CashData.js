const cashData = {
  // вставляй сюда ключом роут, а телом то что хочешь вернуть из запроса
};

export default class Cash {
  static get(key) {
    return process.server ? cashData[key] || null : window.cashData?.[key] || cashData[key] || null;
  }
}
