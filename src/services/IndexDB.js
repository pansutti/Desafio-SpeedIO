const DB_NAME = 'NomeDoSeuBancoDeDados';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'anotacoes';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    console.log('Abrindo banco de dados...')
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        const objectStore = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('anotacoes', 'anotacoes', { unique: false });
        objectStore.createIndex('potencialNegocio', 'potencialNegocio', { unique: false });
        objectStore.createIndex('categorizacao', 'categorizacao', { unique: false });
        objectStore.createIndex('lembrete', 'lembrete', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const adicionarAnotacao = (anotacao) => {
  return new Promise(async (resolve, reject) => {
    console.log('Adicionando anotação ao IndexedDB...', anotacao);
    const db = await openDB();
    const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

    const requestAdd = objectStore.add(anotacao);

    requestAdd.onsuccess = () => resolve();
    requestAdd.onerror = () => reject(requestAdd.error);

    transaction.oncomplete = () => db.close();
  });
};

const obterAnotacoes = () => {
  return new Promise(async (resolve, reject) => {
    console.log('Obtendo anotações do IndexedDB...');
    const db = await openDB();
    const transaction = db.transaction([OBJECT_STORE_NAME], 'readonly');
    const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

    const requestGetAll = objectStore.getAll();

    requestGetAll.onsuccess = () => resolve(requestGetAll.result);
    requestGetAll.onerror = () => reject(requestGetAll.error);

    transaction.oncomplete = () => db.close();
  });
};

const deletarAnotacao = (id) => {
  return new Promise(async (resolve, reject) => {
    const db = await openDB();
    const transaction = db.transaction([OBJECT_STORE_NAME], 'readwrite');
    const store = transaction.objectStore(OBJECT_STORE_NAME);

    store.delete(id).onsuccess = () => {
      resolve();
    };

    transaction.onerror = (event) => {
      reject(event.target.error);
    };
  });
};


export { adicionarAnotacao, obterAnotacoes, deletarAnotacao };