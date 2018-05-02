import { expect } from 'chai'
import { shallow } from '@vue/test-utils'
import Calculator from '@/components/Calculator.vue'

let click = function(wrapper, buttons) {
  buttons
  .split(' ')
  .map(
    (button) => wrapper.find('button[name="button-' + button + '"]').trigger('click')
  )
};

let expectDisplayEquals = function(wrapper, result) {
  expect(wrapper.find('.display').text()).to.equal(result)
};

describe('Calculator.vue', () => {
  it('renders the button 1', () => {
    const wrapper = shallow(Calculator);
    expect(wrapper.text()).to.include('1')
  })

  it('it shows the clicked number in the display', () => {
    const wrapper = shallow(Calculator)
    click(wrapper, '1')
    expectDisplayEquals(wrapper, '1')
  })

  it('it shows multiple clicked numbers in the display', () => {
    const wrapper = shallow(Calculator)
    click(wrapper, '1 2')
    expectDisplayEquals(wrapper, '12')
  })

  it('it adds two numbers', () => {
    const wrapper = shallow(Calculator)
    click(wrapper, '1 + 2 =')
    expectDisplayEquals(wrapper, '3')
  })

  it('it multiplies two numbers', () => {
    const wrapper = shallow(Calculator);
    click(wrapper, '9 x 1 0 =')
    expectDisplayEquals(wrapper, '90')
  })

  it('it divides two numbers', () => {
    const wrapper = shallow(Calculator)
    click(wrapper, '6 / 3 =')
    expectDisplayEquals(wrapper, '2')
  })
})
