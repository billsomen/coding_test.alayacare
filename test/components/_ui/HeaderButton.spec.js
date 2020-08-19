import { shallowMount } from '@vue/test-utils'
import HeaderButton from '@/components/_ui/HeaderButton.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(HeaderButton, {
    propsData: {
      text: 'Bill Somen',
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('ui_HeaderButton', () => {
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('is text shown', () => {
    expect(wrapper.find('.text-view').exists()).toBe(true)
    expect(wrapper.find('.text-view').text()).toEqual('Bill Somen')
  })

  it('is text not shown', () => {
    wrapper = shallowMount(HeaderButton)
    expect(wrapper.vm.text).toBe(null)
    expect(wrapper.find('.text-view').exists()).toBe(false)
  })
})
