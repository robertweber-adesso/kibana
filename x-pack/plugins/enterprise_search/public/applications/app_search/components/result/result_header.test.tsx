/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';

import { shallow } from 'enzyme';

import { ResultHeader } from './result_header';

describe('ResultHeader', () => {
  const resultMeta = {
    id: '1',
    scopedId: '1',
    score: 100,
    engine: 'my-engine',
  };

  it('renders', () => {
    const wrapper = shallow(<ResultHeader showScore={false} resultMeta={resultMeta} />);
    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('always renders an id', () => {
    const wrapper = shallow(<ResultHeader showScore={false} resultMeta={resultMeta} />);
    expect(wrapper.find('[data-test-subj="ResultId"]').prop('value')).toEqual('1');
  });

  describe('score', () => {
    it('renders score if showScore is true ', () => {
      const wrapper = shallow(<ResultHeader showScore={true} resultMeta={resultMeta} />);
      expect(wrapper.find('[data-test-subj="ResultScore"]').prop('value')).toEqual(100);
    });

    it('does not render score if showScore is false', () => {
      const wrapper = shallow(<ResultHeader showScore={false} resultMeta={resultMeta} />);
      expect(wrapper.find('[data-test-subj="ResultScore"]').exists()).toBe(false);
    });
  });

  describe('engine', () => {
    it('renders engine name if the ids dont match, which means it is a meta engine', () => {
      const wrapper = shallow(
        <ResultHeader
          showScore={true}
          resultMeta={{
            ...resultMeta,
            id: '1',
            scopedId: 'my-engine|1',
          }}
        />
      );
      expect(wrapper.find('[data-test-subj="ResultEngine"]').prop('value')).toBe('my-engine');
    });

    it('does not render an engine name if the ids match, which means it is not a meta engine', () => {
      const wrapper = shallow(
        <ResultHeader
          showScore={true}
          resultMeta={{
            ...resultMeta,
            id: '1',
            scopedId: '1',
          }}
        />
      );
      expect(wrapper.find('[data-test-subj="ResultEngine"]').exists()).toBe(false);
    });
  });
});
