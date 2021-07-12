import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useStyles } from '../../pages/new-fanfic-page/styled';

const EMPTY_CHAPTERS = [
  {
    title: '', text: '', id: uuid(),
  },
];

const Chapters = ({ onChange, data }) => {
  const classes = useStyles();
  const [chapters, setChapters] = useState(data.length ? data : EMPTY_CHAPTERS);

  useEffect(() => {
    onChange(chapters);
  }, [chapters]);

  const addChapter = () => {
    setChapters(chapters.concat({
      title: '', text: '', id: uuid(),
    }));
  };

  const onChapterChange = (id, field, value) => {
    setChapters(chapters.map((c) => {
      if (c.id === id) {
        c[field] = value;
      }

      return c;
    }));
  };

  const moveChapter = (sourceIndex, destinationIndex) => {
    const newChapters = [...chapters];
    const chapter = newChapters[sourceIndex];
    newChapters.splice(sourceIndex, 1);
    newChapters.splice(destinationIndex, 0, chapter);
    setChapters(newChapters);
  };

  const onDragEnd = (result) => {
    if (result.reason === 'DROP') {
      moveChapter(result.source.index, result.destination.index);
    }
  };

  const deleteChapter = (id) => {
    setChapters(chapters.filter((c) => c.id !== id));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Button
          className={classes.button}
          color="primary"
          onClick={addChapter}
          size="medium"
          type="button"
          variant="contained"
        >
          Добавить главу
        </Button>
      </div>

      <Droppable droppableId="chapters">
        {(droppableProvided) => (
          <div
            className={classes.droppable}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {chapters.map((chapter, chapterNumber) => (
              <Draggable className={classes.textMultiline} draggableId={chapter.id} index={chapterNumber} key={chapter.id}>
                {(draggableProvided) => (
                  <Accordion
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      expandIcon={<ExpandMoreIcon />}
                    >

                      <TextField
                        className={classes.heading}
                        label={`Глава ${chapterNumber + 1}`}
                        name={`chapter-${chapterNumber + 1}-title`}
                        onChange={(e) => onChapterChange(chapter.id, 'title', e.target.value)}
                        value={chapter.title}
                      />
                      <HighlightOffIcon onClick={() => deleteChapter(chapter.id)} />
                      <MenuIcon style={{ cursor: 'move' }} />
                    </AccordionSummary>
                    <AccordionDetails>
                      <TextField
                        className={classes.descriptionChapter}
                        multiline
                        name={`chapter-${chapterNumber + 1}-text`}
                        onChange={(e) => onChapterChange(chapter.id, 'text', e.target.value)}
                        value={chapter.text}
                      />
                    </AccordionDetails>
                  </Accordion>
                )}
              </Draggable>
            ))}

          </div>

        )}
      </Droppable>
    </DragDropContext>
  );
};

Chapters.defaultProps = {
  data: EMPTY_CHAPTERS,
};

Chapters.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default Chapters;
