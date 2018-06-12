import memo from './memo';
import selector from './selector';
import argsEquals from './argsEquals';
import rerex from './rerex';

rerex.memo = memo;
rerex.selector = selector;
rerex.argsEquals = argsEquals;

export default rerex;
