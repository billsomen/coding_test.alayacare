import { shallowMount } from '@vue/test-utils'
import Avatar from '@/components/Avatar.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Avatar, {
    propsData: {
      alt: 'logo-icon',
      uri: '/logo.jpg',
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Avatar', () => {
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
