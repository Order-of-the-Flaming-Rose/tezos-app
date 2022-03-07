import axios from 'axios';

const TZKTInstance = axios.create({
  baseURL: 'https://api.hangzhou2net.tzkt.io/v1',
});

export const TZKTService = {
  getOperations(walletAddress: string) {
    return TZKTInstance.get(`/accounts/${walletAddress}/operations?limit=5`);
  },

  getNextOperations(walletAddress: string, lastId: number) {
    return TZKTInstance.get(
      `/accounts/${walletAddress}/operations?limit=5&lastid=${lastId}`,
    );
  },

  getAccount(walletAddress: string) {
    return TZKTInstance.get(`accounts/${walletAddress}`);
  },

  getCurrencyRate() {
    return TZKTInstance.get('head');
  },

  getAllowance(walletAddress: string) {
    return TZKTInstance.get(`/bigmaps/153235/${walletAddress}`);
  },
};
