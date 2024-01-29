import { fetchQuery, init } from '@airstack/node';
import { FetchAssociatedAddressQueryQuery } from './types';

interface QueryResponse {
  data: FetchAssociatedAddressQueryQuery | null;
  error: Error | null;
}

interface Error {
  message: string;
}

const query = /* GraphQL */ `
  query FetchAssociatedAddressQuery($profileName: String!) {
    Socials(
      input: { filter: { profileName: { _eq: $profileName }, dappName: { _eq: farcaster } }, blockchain: ethereum }
    ) {
      Social {
        userAddress
        userAssociatedAddresses
        userAssociatedAddressDetails {
          primaryDomain {
            name
            resolvedAddress
            owner
          }
        }
      }
    }
  }
`;

init(process.env.AIRSTACK_API_KEY!);

export const getAssociatedAddress = async (farcasterProfileName: string) => {
  console.log(query);
  const { data, error }: QueryResponse = await fetchQuery(query, {
    profileName: farcasterProfileName,
  });
  console.log({ error, data });
  if (error || !data || !data.Socials.Social || data.Socials?.Social?.length === 0) {
    return null;
  }
  return data.Socials?.Social[0].userAssociatedAddressDetails?.find((addr) => addr.primaryDomain)?.primaryDomain
    .resolvedAddress;
};
