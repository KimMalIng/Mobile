import { useState, useEffect } from "react";
import randomstring from "randomstring";
import { CalenderProps, SetLabelColor } from "@/Presentation/Type";
import style from "@/Presentation/Style/Calender.module.css";

const Calender = ({ data, updateNowDate }: CalenderProps) => {
  const [list, setList] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [startTime, setStartTime] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [endTime, setEndTime] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [isRender, setIsRender] = useState(false);
  const createCalender = async () => {
    await Promise.all(
      data.map(async (d) => {
        const date = new Date(`${d.day.replaceAll(".", "-")}`);
        const day = date.getDay() - 1;
        await Promise.all(
          d.subject.map((s) => {
            let start = Number(s.startTime.split(":")[0]);
            if (isNaN(start)) return;
            start = start - 8;
            const startPercentage = Number(s.startTime.split(":")[1]);
            if (isNaN(startPercentage)) return;
            let end = Number(s.endTime.split(":")[0]);
            if (isNaN(end)) return;
            end = end - 8;
            const endPercentage = Number(s.endTime.split(":")[1]);
            if (isNaN(endPercentage)) return;
            let changeList = list;
            changeList[day][start] = s.label + 1;
            for (let i = start + 1; i < end; i++) {
              changeList[day][i] = s.label + 1;
            }
            changeList[day][end] = s.label + 1;

            let changeEndList = endTime;
            changeEndList[day][end] = endPercentage;
            setEndTime([...changeEndList]);
            let changeStartList = startTime;
            changeStartList[day][start] = startPercentage;
            setStartTime([...changeStartList]);

            setList([...changeList]);
          }),
        );
      }),
    );
    setList([...list]);
    setIsRender(true);
  };

  useEffect(() => {}, [list]);

  const setLabelColor = (label: number): string => {
    if (label === 1) return "#BBF7BA";
    if (label === 2) return "#A8D5FF";
    if (label === 3) return "#FFD4C1";
    if (label === 4) return "#FBE299";
    if (label === 5) return "#FF94A7";
    return "#fff";
  };

  const setLabelSize = (
    color: string,
    dayIndex: number,
    index: number,
  ): SetLabelColor => {
    if (startTime[dayIndex][index] !== 0) {
      return {
        background: `linear-gradient(
          #fff ${Math.floor((startTime[dayIndex][index] / 60) * 100)}%,
          ${color} ${Math.floor((startTime[dayIndex][index] / 60) * 100)}%)`,
        borderBottom: `1px solid ${color}`,
      };
    }
    if (endTime[dayIndex][index] !== 0) {
      return {
        background: `linear-gradient(
          ${color} ${Math.floor((endTime[dayIndex][index] / 60) * 100)}%, 
          #fff ${0}%)`,
        borderBottom: `1px solid rgb(220, 220, 220)`,
      };
    }
    if (color !== "#fff") {
      return {
        backgroundColor: color,
        borderBottom: `1px solid ${color}`,
      };
    }
    return {
      backgroundColor: color,
    };
  };
  const renderCalender = () => {
    return list.map((d, dayIndex) => {
      return (
        <div
          className={style.CalenderContentList}
          key={randomstring.generate(16)}
        >
          {d.map((s, i) => {
            return (
              <div
                key={randomstring.generate(16)}
                style={{
                  borderBottom: `1px solid rgb(220, 220, 220)`,
                  ...setLabelSize(setLabelColor(Math.floor(s)), dayIndex, i),
                }}
              ></div>
            );
          })}
        </div>
      );
    });
  };
  useEffect(() => {
    createCalender();
  }, []);

  return (
    <div className={style.Calender}>
      <div className={style.title}>
      </div>
      <div className={style.calenderBox}>
        <div className={style.calenderRow}>
          <div className={style.calenderRowTitle}>8</div>
          <div className={style.calenderRowTitle}>9</div>
          <div className={style.calenderRowTitle}>10</div>
          <div className={style.calenderRowTitle}>11</div>
          <div className={style.calenderRowTitle}>12</div>
          <div className={style.calenderRowTitle}>13</div>
          <div className={style.calenderRowTitle}>14</div>
          <div className={style.calenderRowTitle}>15</div>
          <div className={style.calenderRowTitle}>16</div>
          <div className={style.calenderRowTitle}>17</div>
          <div className={style.calenderRowTitle}>18</div>
          <div className={style.calenderRowTitle}>19</div>
          <div className={style.calenderRowTitle}>20</div>
          <div className={style.calenderRowTitle}>21</div>
          <div className={style.calenderRowTitle}>22</div>
          <div className={style.calenderRowTitle}>23</div>
          <div className={style.calenderRowTitle}>24</div>
        </div>
        <div className={style.calenderContent}>
          <div className={style.calenderTitle}>
            <div
              className={style.calenderTitleSection}
              onClick={() => updateNowDate(1)}
            >
              월
            </div>
            <div
              className={style.calenderTitleSection}
              onClick={() => updateNowDate(2)}
            >
              화
            </div>
            <div
              className={style.calenderTitleSection}
              onClick={() => updateNowDate(3)}
            >
              수
            </div>
            <div
              className={style.calenderTitleSection}
              onClick={() => updateNowDate(4)}
            >
              목
            </div>
            <div
              className={style.calenderTitleSection}
              onClick={() => updateNowDate(5)}
            >
              금
            </div>
            <div
              className={style.calenderTitleSection}
              onClick={() => updateNowDate(6)}
            >
              토
            </div>
            <div
              className={style.calenderTitleSection}
              onClick={() => updateNowDate(7)}
            >
              일
            </div>
          </div>
          <div className={style.CalenderBox}>
            {isRender ? renderCalender() : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;
