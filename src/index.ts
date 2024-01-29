import 'dotenv/config';
import { getAssociatedAddress } from './airstack';

export const main = async () => {
  console.log(await getAssociatedAddress('orbulo.eth'));
};

main().then(() => {
  process.exit(0);
});
