import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home component', () => {
  it('renders the logo', () => {
    const { container } = render(<Home />);
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
