import React from 'react';
import { RxQuestionMarkCircled } from 'react-icons/rx';

interface Props {
  description: string
}

export default function ShowDescription({
  description
}: Props) {
  return (
    <button title={description}>
      <RxQuestionMarkCircled className="text-gray-600" />
    </button>
  )
}
