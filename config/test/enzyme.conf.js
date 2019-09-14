// Copyright (c) 2019 Gonzalo Müller Bravo.
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme'

Enzyme.configure({ adapter: new Adapter() })

beforeEach(() => {
  jasmineEnzyme()
})

export * from 'enzyme'
