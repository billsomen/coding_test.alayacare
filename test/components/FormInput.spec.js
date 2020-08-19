import { shallowMount } from '@vue/test-utils'
import FormInput from '@/components/FormInput.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(FormInput, {
    propsData: {
      label: 'Card Name',
      options: {
        key: 'card',
        roles: 'VisaCard',
        cleave: true,
      },
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('FormInput', () => {
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('is cleave mounted', () => {
    expect(wrapper.vm.$refs.inputElement.$el).toBeDefined()
  })

  test('is input mounted', () => {
    wrapper.setProps({ cleave: false })
    expect(wrapper.vm.$refs.inputElement.$el).toBeDefined()
  })

  test('is focusing on div click', async () => {
    const divWrapper = wrapper.find('.input-wrapper')
    divWrapper.vm.$emit('click')
    await divWrapper.vm.$nextTick()

    const onClick = jest.spyOn(wrapper.vm, 'onClick')
    expect(onClick).toHaveBeenCalled()
  })
})
