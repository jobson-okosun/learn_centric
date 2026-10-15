import { Component, computed, inject, Injector, input, model, signal, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA, viewChild, TemplateRef } from '@angular/core';
import { AngularTiptapEditorComponent } from '@flogeez/angular-tiptap-editor';
import { EquationExtension } from './extensions/equation.extension';
import { ClozeExtension } from './extensions/cloze.extension';
import { ClozeDropdownExtension } from './extensions/cloze-dropdown.extension';
import { Indent } from './extensions/indent.extension';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import { ZardDialogService, ZardDialogRef } from '@/shared/components/dialog';
import { CommonModule } from '@angular/common';
import 'mathlive';
import { CHARMAP_DATA, SpecialCharacter } from './extensions/charmap.data';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontSize, FontFamily } from './extensions/font.extension';
import TextAlign from '@tiptap/extension-text-align';
import { ClozeRadioExtension } from './extensions/cloze-radio.extension';

@Component({ 
  selector: 'app-tiptap-editor',
  imports: [CommonModule, AngularTiptapEditorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tiptap-editor.html',
}) 
export class TiptapEditor {
  private injector = inject(Injector);
  private elementRef = inject(ElementRef);
  private dialogService = inject(ZardDialogService);
  private editListenerAttached = false;

  content = model<string>('');
  placeholder = input<string>('Write something...');
  
  minHeight = input<string | number>('100px');
  height = input<string | number | undefined>(undefined);
  maxHeight = input<string | number | undefined>(undefined);
  
  showCloze = input<boolean>(false);
  showClozeDropdown = input<boolean>(false);
  showClozeRadio = input<boolean>(false);
  
  floatingToolbar = input<boolean>(false);
  showFooter = input<boolean>(true);

  @ViewChild('mathField') mathField!: ElementRef;
  
  mathDialogTemplate = viewChild.required<TemplateRef<any>>('mathDialogTemplate');
  imageDialogTemplate = viewChild.required<TemplateRef<any>>('imageDialogTemplate');
  charMapDialogTemplate = viewChild.required<TemplateRef<any>>('charMapDialogTemplate');
  
  private activeDialogRef: ZardDialogRef<any> | null = null;

  isFontMenuVisible = signal<boolean>(false);

  activeEquationPos = signal<number | null>(null);
  currentMathValue = signal<string>('');
  
  charMapSearch = signal<string>('');
  activeCategory = signal<string>('All');
  
  imageAltText = signal<string>('');
  imageFileBase64 = signal<string | null>(null);
  isEditingImage = signal<boolean>(false);
  activeImagePos = signal<number | null>(null);
  
  editorInstance: any = null;

  extensions = computed(() => {
    return [
      Superscript,
      Subscript,
      Indent,
      TextStyle,
      FontSize,
      FontFamily,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      EquationExtension(this.injector),
      ClozeExtension(this.injector),
      ClozeDropdownExtension(this.injector),
      ClozeRadioExtension(this.injector)
    ];
  });

  applyFont(fontFamily: string) {
    this.editorInstance?.commands.setFontFamily(fontFamily);
    this.isFontMenuVisible.set(false);
  }
  
  applySize(fontSize: string) {
    this.editorInstance?.commands.setFontSize(fontSize);
    this.isFontMenuVisible.set(false);
  }

  onImageFileSelected(event: any) {
    const file = event.files?.[0] || event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageFileBase64.set(e.target?.result as string);
        if (!this.imageAltText()) {
            const fileName = file.name.replace(/\.[^/.]+$/, "");
            this.imageAltText.set(fileName);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onAltTextInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.imageAltText.set(input.value);
  }

  saveImage() {
    const base64 = this.imageFileBase64();
    if (base64 && this.editorInstance) {
      const alt = this.imageAltText() || 'Image';
      
      let chain = this.editorInstance.chain().focus();
      
      if (this.isEditingImage() && this.activeImagePos() !== null) {
        chain = chain.setNodeSelection(this.activeImagePos());
      }
      
      chain.insertContent(`<img src="${base64}" alt="${alt}">`).run();
    }
    this.cancelImage();
  }

  cancelImage() {
    if (this.activeDialogRef) {
      this.activeDialogRef.close();
      this.activeDialogRef = null;
    }
    this.imageAltText.set('');
    this.imageFileBase64.set(null);
    this.isEditingImage.set(false);
    this.activeImagePos.set(null);
  }

  charMapCategories = computed(() => {
    return ['All', ...CHARMAP_DATA.map(c => c.name)];
  });

  filteredCharMap = computed(() => {
    const search = this.charMapSearch().toLowerCase();
    const category = this.activeCategory();
    let allChars: SpecialCharacter[] = [];

    if (category === 'All') {
      allChars = CHARMAP_DATA.flatMap(c => c.characters);
    } else {
      allChars = CHARMAP_DATA.find(c => c.name === category)?.characters || [];
    }

    if (!search) return allChars;

    return allChars.filter(c => 
      c.char.toLowerCase().includes(search) || 
      c.keywords.some(k => k.toLowerCase().includes(search))
    );
  });

  imageBubbleMenuConfig = computed(() => {
    return {
      changeImage: false 
    };
  });

  toolbarConfig = computed(() => {
    const config: any = {
      superscript: true,
      subscript: true,
      alignLeft: true,
      alignCenter: true,
      alignRight: true,
      alignJustify: true,
      image: false,
      custom: [
        {
          key: 'fontSettings',
          label: 'Font Settings',
          icon: 'text_fields',
          command: (editor: any) => {
            this.editorInstance = editor;
            this.isFontMenuVisible.set(!this.isFontMenuVisible());
          }
        },
        {
          key: 'insertImage',
          label: 'Insert/Edit Image',
          icon: 'image',
          command: (editor: any) => {
            this.editorInstance = editor;
            
            // If an image is currently selected, open the modal in edit mode
            const selection = editor.state.selection;
            if (selection && selection.node && selection.node.type.name.toLowerCase().includes('image')) {
                const attrs = selection.node.attrs;
                this.imageFileBase64.set(attrs.src || null);
                this.imageAltText.set(attrs.alt || '');
                this.isEditingImage.set(true);
                this.activeImagePos.set(selection.from);
            } else {
                this.imageFileBase64.set(null);
                this.imageAltText.set('');
                this.isEditingImage.set(false);
                this.activeImagePos.set(null);
            }
            
            this.activeDialogRef = this.dialogService.create({
              zTitle: this.isEditingImage() ? 'Update Image' : 'Insert Image',
              zContent: this.imageDialogTemplate(),
              zWidth: '450px',
              zHideFooter: true
            });
          }
        },
        {
          key: 'indent',
          label: 'Increase Indent',
          icon: 'format_indent_increase',
          command: (editor: any) => editor.commands.indent()
        },
        {
          key: 'outdent',
          label: 'Decrease Indent',
          icon: 'format_indent_decrease',
          command: (editor: any) => editor.commands.outdent()
        }
      ]
    };
    
    if (this.showCloze()) {
      config.custom.push({
        key: 'cloze',
        label: 'Insert Cloze Blank',
        icon: 'more_horiz',
        iconText: '[...]',
        command: (editor: any) => editor.commands.insertCloze()
      });
    }

    if (this.showClozeDropdown()) {
      config.custom.push({
        key: 'clozeDropdown',
        label: 'Insert Dropdown Blank',
        icon: 'more_horiz',
        iconText: '[...]',
        command: (editor: any) => {
          const uniqueId = Date.now().toString();
          editor.commands.insertClozeDropdown({ dropdownId: uniqueId });
        }
      });
    }

    if (this.showClozeRadio()) {
      config.custom.push({
        key: 'clozeRadio',
        label: 'Insert Radio Blank',
        icon: 'more_horiz',
        iconText: '[...]',
        command: (editor: any) => {
          const uniqueId = Date.now().toString();
          editor.commands.insertClozeRadio({ radioId: uniqueId });
        }
      });
    }

    config.custom.push(
      {
        key: 'equation',
        label: 'Math Equation',
          icon: 'functions',
          command: (editor: any) => {
            this.editorInstance = editor;
            this.activeEquationPos.set(null);
            this.currentMathValue.set('');
            this.activeDialogRef = this.dialogService.create({
              zTitle: 'Insert Math Equation',
              zContent: this.mathDialogTemplate(),
              zWidth: '450px',
              zHideFooter: true
            });
            setTimeout(() => {
                if (this.mathField?.nativeElement) {
                    this.mathField.nativeElement.value = '';
                }
            }, 100);
          }
        },
        {
          key: 'charmap',
          label: 'Special Character',
          icon: 'emoji_symbols',
          command: (editor: any) => {
            this.editorInstance = editor;
            this.activeDialogRef = this.dialogService.create({
              zTitle: 'Special Character',
              zContent: this.charMapDialogTemplate(),
              zWidth: '500px',
              zHideFooter: true
            });
            this.charMapSearch.set('');
            this.activeCategory.set('All');
          }
        }
    );

    return config;
  });

  onContentChange(newContent: string) {
    this.content.set(newContent);
  }

  onMathInput(event: any) {
    this.currentMathValue.set(event.target.value);
  }

  onCharMapSearch(event: any) {
    this.charMapSearch.set(event.target.value);
  }

  selectCategory(category: string) {
    this.activeCategory.set(category);
  }

  insertChar(char: string) {
    if (this.editorInstance) {
      this.editorInstance.commands.insertContent(char);
    }
    if (this.activeDialogRef) {
      this.activeDialogRef.close();
      this.activeDialogRef = null;
    }
  }

  onEditorReady(editor: any) {
    this.editorInstance = editor;
    
    this.editorInstance.on('update', () => {
      this.content.set(this.editorInstance.getHTML());
    });
    
    this.elementRef.nativeElement.addEventListener('update-cloze', ((e: CustomEvent) => {
      if (this.editorInstance) {
        this.editorInstance.commands.setNodeSelection(e.detail.pos);
        this.editorInstance.commands.updateAttributes('cloze', { answer: e.detail.answer });
      }
    }) as EventListener);
    
    if (!this.editListenerAttached) {
      this.elementRef.nativeElement.addEventListener('edit-equation', ((e: CustomEvent) => {
        this.activeEquationPos.set(e.detail.pos);
        this.currentMathValue.set(e.detail.latex);
        this.activeDialogRef = this.dialogService.create({
          zTitle: 'Insert Math Equation',
          zContent: this.mathDialogTemplate(),
          zWidth: '450px',
          zHideFooter: true
        });
        setTimeout(() => {
            if (this.mathField?.nativeElement) {
                this.mathField.nativeElement.value = e.detail.latex;
            }
        }, 100);
      }) as EventListener);
      this.editListenerAttached = true;
    }
  }

  saveEquation() {
    const latex = this.mathField?.nativeElement?.value || '';
    
    try {
      if (this.activeEquationPos() !== null) {
        this.editorInstance.commands.setNodeSelection(this.activeEquationPos()!);
        this.editorInstance.commands.updateAttributes('equation', { latex });
        this.editorInstance.commands.setTextSelection(this.activeEquationPos()! + 1);
      } else {
        this.editorInstance.commands.insertEquation({ latex });
      }
    } catch (e) {
      console.warn("Failed to update equation. The node position may have changed.", e);
    } finally {
      this.activeEquationPos.set(null);
      if (this.activeDialogRef) {
        this.activeDialogRef.close();
        this.activeDialogRef = null;
      }
    }
  }

  cancelEquation() {
    if (this.activeDialogRef) {
      this.activeDialogRef.close();
      this.activeDialogRef = null;
    }
  }
}
