import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Image,
  ModalBody,
  Center,
} from '@chakra-ui/react';
import { ITaskReport } from '../../models/taskReport';
import './styles.css';
import { BsDownload } from 'react-icons/bs';
import { TaskReportTable } from '../TaskReportTable';

interface TaskReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskReport?: ITaskReport;
}

export const TaskReportDetailModal = (props: TaskReportDetailModalProps) => {
  const { isOpen, onClose, taskReport } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>報告内容</ModalHeader>
        <ModalBody>
          <Center>
            <div className='task-report-image-container'>
              <a href={taskReport?.image} download={`${taskReport?.id}.png`}>
                <Image
                  cursor='pointer'
                  boxSize='150px'
                  borderRadius={5}
                  objectFit='cover'
                  src={taskReport?.image ?? 'https://via.placeholder.com/150'}
                  alt='image'
                />
              </a>
              {taskReport?.image && (
                <BsDownload
                  size={32}
                  className='task-report-image-download-icon'
                />
              )}
            </div>
          </Center>
          <TaskReportTable taskReport={taskReport} />
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};
