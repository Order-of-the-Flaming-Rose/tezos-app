import React from 'react';
import { TOperation } from '../Activity/Activity';
import Span from '../Span';
import styles from './Operation.module.scss';

function Operation({
  type,
  amount,
  timestamp,
  sender,
  target,
  hash,
}: TOperation) {
  return (
    <li className={styles.item}>
      {type === 'transaction' ? <Span>amount : {amount}</Span> : null}

      <Span>{timestamp}</Span>

      {type === 'transaction' ? (
        <>
          <Span> from {sender?.address}</Span>
          <Span> to {target?.address}</Span>
        </>
      ) : null}

      <Span>
        <a
          href={`https://hangzhou2net.tzkt.io/${hash}`}
          target='_blank'
          rel='noreferrer'
        >
          view in the block explorer {hash}
        </a>
      </Span>
    </li>
  );
}

export default Operation;
