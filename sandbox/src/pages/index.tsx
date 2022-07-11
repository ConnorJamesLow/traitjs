import jsx from 'texsaur';
import ContentLayout from '../layout/content';

export default
    <ContentLayout>
        <header class="heading">
            <h1 class="heading__title">Headings</h1>
            <span class="heading__sub">Useful for titling pages or sections.</span>
        </header>
        <div class="box --border --neutral">
            <div class="heading --1">
                <h1 class="heading__title">Heading 1</h1>
            </div>
            <div class="heading">
                <h1 class="heading__title">Heading 2 (default)</h1>
            </div>
            <div class="heading --3">
                <h1 class="heading__title">Heading 3</h1>
            </div>
            <div class="heading --4">
                <h1 class="heading__title">Heading 4</h1>
            </div>
            <div class="heading --1">
                <h1 class="heading__title">Heading 1</h1>
                <span class="heading__sub">The quick brown fox jumps over the lazy dog.</span>
            </div>
            <div class="heading">
                <h1 class="heading__title">Heading 2 (default)</h1>
                <span class="heading__sub">The quick brown fox jumps over the lazy dog.</span>
            </div>
            <div class="heading --3">
                <h1 class="heading__title">Heading 3</h1>
                <span class="heading__sub">The quick brown fox jumps over the lazy dog.</span>
            </div>
            <div class="heading --4">
                <h1 class="heading__title">Heading 4</h1>
                <span class="heading__sub">The quick brown fox jumps over the lazy dog.</span>
            </div>
        </div>
    </ContentLayout>
