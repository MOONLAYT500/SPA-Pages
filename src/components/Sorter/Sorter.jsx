import { Typography } from 'antd';
import { Radio, Button } from 'antd';
import s from './Sorter.module.css';
import {
    UpCircleTwoTone,
    DownCircleTwoTone,
} from '@ant-design/icons/lib/icons';
const { Text } = Typography;

const Sorter = ({
    statusFilter, // filter by status func
    createdAtFilter, // filter by date func
}) => {
    const chekedFilter = (e) => statusFilter(e.target.value); // setting value to sort func

    return (
        <div className={s.sort}>
            <Radio.Group
                onChange={chekedFilter}
                buttonStyle="solid"
                defaultValue={'all'}
            >
                <Radio.Button value={'all'}>All</Radio.Button>
                <Radio.Button value={true}>Done</Radio.Button>
                <Radio.Button value={false}>Undone</Radio.Button>
            </Radio.Group>
            <div className={s.sortByDate}>
                <Text style={{ paddingRight: '10px' }}>Sort by Date</Text>
                <Button
                    onClick={() => {
                        createdAtFilter('asc');
                    }}
                    icon={<UpCircleTwoTone />}
                    type="ghost"
                ></Button>
                <Button
                    autoFocus
                    onClick={() => {
                        createdAtFilter('desc');
                    }}
                    icon={<DownCircleTwoTone />}
                    type="ghost"
                ></Button>
            </div>
        </div>
    );
};

export default Sorter;
