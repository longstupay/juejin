import { render } from '@testing-library/react';

import UiTaibUi from './ui-taib-ui';

describe('UiTaibUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiTaibUi />);
    expect(baseElement).toBeTruthy();
  });
});
