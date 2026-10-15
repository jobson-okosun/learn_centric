import { Component, signal, input } from '@angular/core';
import { TiptapEditor } from '@/shared/components/tiptap-editor/tiptap-editor';
import { McqSingleChoice } from '../mcq-single-choice/mcq-single-choice';
import { McqMultipleChoice } from '../mcq-multiple-choice/mcq-multiple-choice';
import { TrueFalse } from '../true-false/true-false';
import { YesNo } from '../yes-no/yes-no';
import { ChoiceMatrix } from '../choice-matrix/choice-matrix';
import { ShortText } from '../short-text/short-text';
import { EssayPlainText } from '../essay-plain-text/essay-plain-text';
import { EssayRichText } from '../essay-rich-text/essay-rich-text';
import { ClozeText } from '../cloze-text/cloze-text';
import { ClozeDropdown } from '../cloze-dropdown/cloze-dropdown';
import { ClozeRadio } from '../cloze-radio/cloze-radio';
import { ClozeTextImage } from '../cloze-text-image/cloze-text-image';
import { ClozeDropdownImage } from '../cloze-dropdown-image/cloze-dropdown-image';
import { ImageDragAndDrop } from '../image-drag-and-drop/image-drag-and-drop';
import { DrawingAndWriting } from '../drawing-and-writing/drawing-and-writing';
import { OrderList } from '../order-list/order-list';
import { Association } from '../association/association';
import { McqPreview } from '../../item-types/mcq-preview/mcq-preview';
import { MrqPreview } from '../../item-types/mrq-preview/mrq-preview';
import { TrueFalsePreview } from '../../item-types/true-false-preview/true-false-preview';
import { YesNoPreview } from '../../item-types/yes-no-preview/yes-no-preview';
import { ChoiceMatrixPreview } from '../../item-types/choice-matrix-preview/choice-matrix-preview';
import { ShortTextPreview } from '../../item-types/short-text-preview/short-text-preview';
import { EssayPlainTextPreview } from '../../item-types/essay-plain-text-preview/essay-plain-text-preview';
import { EssayRichTextPreview } from '../../item-types/essay-rich-text-preview/essay-rich-text-preview';
import { ClozeTextPreview } from '../../item-types/cloze-text-preview/cloze-text-preview';
import { ClozeDropdownPreview } from '../../item-types/cloze-dropdown-preview/cloze-dropdown-preview';
import { ClozeRadioPreview } from '../../item-types/cloze-radio-preview/cloze-radio-preview';
import { ClozeTextImagePreview } from '../../item-types/cloze-text-image-preview/cloze-text-image-preview';
import { ClozeDropdownImagePreview } from '../../item-types/cloze-dropdown-image-preview/cloze-dropdown-image-preview';

@Component({
  selector: 'app-author-manager',
  imports: [
    TiptapEditor, McqSingleChoice, McqMultipleChoice, TrueFalse, YesNo, ChoiceMatrix,
    ShortText, EssayPlainText, EssayRichText, ClozeText, ClozeDropdown, ClozeRadio,
    ClozeTextImage, ClozeDropdownImage, ImageDragAndDrop, DrawingAndWriting, OrderList, Association,
    McqPreview, MrqPreview, TrueFalsePreview, YesNoPreview, ChoiceMatrixPreview,
    ShortTextPreview, EssayPlainTextPreview, EssayRichTextPreview,
    ClozeTextPreview, ClozeDropdownPreview, ClozeRadioPreview, ClozeTextImagePreview, ClozeDropdownImagePreview
  ],
  templateUrl: `./author-manager.html`,
})
export class AuthorManager {
  questionType = input<string | undefined>();
  previewMode = input(false);
  stimulus = signal<string>('');
}
