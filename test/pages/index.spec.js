import { shallowMount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Index)
})

afterEach(() => {
  wrapper.destroy()
})

describe('pages_Index', () => {
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
})
