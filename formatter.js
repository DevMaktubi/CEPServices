export function formatStatus(str) {
    const res = str
      .replace('Status', '')
      .replace(/\s\s+/g, ' ')
      .replace(':', '')
      .trim();
    return res;
  }
  
  export function formatDateTime(str){
    const res = str
      .split(' ')
      .join('')
      .replace(/\s\s+/g, ' ')
      .replace('Data:', '')
      .replace('Hora:', '')
      .split('|');
  
    return res;
  }
  
  export function formatLocal(str) {
    /**
     * @param {string} str
     * Função responsável formatar o Local de entrega de uma encomenda
     */
    const res = str
      .replace('Local', '')
      .replace(/\s\s+/g, ' ')
      .replace(':', '')
      .trim();
    return res;
  }
  
  export function formatOrigin(str) {
    /**
     * @param {string} str
     * Função responsável formatar o Origem do trajeto de entrega de uma encomenda
     */
    const res = str
      .replace('Origem', '')
      .replace(/\s\s+/g, ' ')
      .replace(':', '')
      .trim();
    return res;
  }
  
  export function formatDestiny(str) {
    /**
     * @param {string} str
     * Função responsável formatar o Destino do trajeto de entrega de uma encomenda
     */
    const res = str
      .replace('Destino', '')
      .replace(/\s\s+/g, ' ')
      .replace(':', '')
      .trim();
    return res;
  }