import renderer from 'react-test-renderer';
import { Circle } from "../circle";
import { ElementStates } from '../../../../types/element-states';

const letter = 'a';
const index = 1;

describe("circle tests", () => {

    it('render circle', () => {
        const tree = renderer.create(<Circle />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with letter', () => {
        const tree = renderer.create(<Circle letter={letter} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with head', () => {
        const tree = renderer.create(<Circle head={letter} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with head react-node', () => {
        const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with tail', () => {
        const tree = renderer.create(<Circle tail={letter} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with tail react-node', () => {
        const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with index', () => {
        const tree = renderer.create(<Circle index={index} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with small', () => {
        const tree = renderer.create(<Circle isSmall />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with state default', () => {
        const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with state changing', () => {
        const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('circle with state modified', () => {
        const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})